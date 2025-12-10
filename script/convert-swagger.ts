import {ApiEndpoint, ApiService, ParsedObject, SwaggerSchema, SwaggerSpec} from "@/types/api";
import dayjs from "dayjs";
import axios from "axios";

const ARRAY_OBJECT = ["application/json", "application/xml", "application/x-www-form-urlencoded"]
const TYPE_FILE = "application/octet-stream"

export function swaggerToApiServices(swagger: SwaggerSpec, api: any): ApiService[] {
    let objectSchema: Record<string, any> = {}
    if (api?.components?.schemas){
        objectSchema = parseSwaggerSchemas(api.components.schemas)
    }
    // Create a map of tags to services
    const serviceMap = new Map<string, ApiService>()
    const server = swagger.servers?.[0]?.url || ""
    if (swagger.tags) {
        swagger.tags.forEach((tag) => {
            serviceMap.set(tag.name, {
                id: tag.name.toLowerCase().replace(/\s+/g, "-"),
                code: tag.name.toLowerCase().replace(/\s+/g, "-"),
                name: tag.name,
                description: tag.description || "",
                server: server,
                endpoints: [],
            })
        })
    }

    // Process all paths and operations
    let endpointIdCounter = 0

    Object.entries(swagger.paths).forEach(([pathName, pathItem]) => {
        Object.entries(pathItem).forEach(([method, operation]: [string, any]) => {
            // Skip non-HTTP methods
            if (!["get", "post", "put", "delete", "patch"].includes(method)) return

            const tags = operation.tags || ["default"]
            const operationId = operation.operationId || `${method}_${pathName}`

            // Parse parameters
            const params: Array<{ key: string; value: string; required: boolean; type: string; description: string; in: string}> = []
            const headers: Array<{ key: string; value: string; required: boolean; type: string; description: string }> = []

            if (operation.parameters) {
                operation.parameters.forEach(
                    (param: {
                        description: string
                        name: string
                        in: string
                        required?: boolean
                        schema?: any
                        example?: any
                    }) => {
                        const paramObj = {
                            key: param.name,
                            value: param.example,
                            required: param.required || false,
                            type: getType(param.schema),
                            description: getDescription(param.description, param.schema),
                            in: param.in,
                        }

                        if (param.in === "query" || param.in === "path") {
                            params.push(paramObj)
                        } else if (param.in === "header") {
                            headers.push(paramObj)
                        }
                    },
                )
            }

            // Parse request body
            let body: any = null
            let bodyContent: Array<string> | null = null

            if (operation.requestBody?.content) {
                const contents = Object.entries(operation.requestBody?.content)
                    .map(([key, value]) => {return key})
                bodyContent = contents
                const exists = ARRAY_OBJECT.some(item => contents.includes(item));
                if (exists) {
                    const content = contents.filter(item => item !== TYPE_FILE )
                    if (content.length > 0) {
                        const schemas = operation.requestBody?.content[content[0]]
                        let name = schemas.schema.$ref?.split("/").pop();
                        const type = schemas.schema.type;
                        body = objectSchema[name]
                        if (type === "array"){
                            name = schemas.schema.items.$ref?.split("/").pop();
                            body = [objectSchema[name]];
                        }else if(type === "object"){
                            body = schemas.example
                        }
                    }
                }
            }

            // Parse responses with variants support
            //const responseMap = new Map<number, Array<{ errorName?: string; description: string; data: any }>>()
            let responses: Array<{
                status: number
                description: string
                data: any
            }> = []

            if (operation.responses) {
                Object.entries(operation.responses).forEach(([statusCode, response]: [string, any]) => {
                    const status = statusCode === "default" ? 0 : Number.parseInt(statusCode, 10)
                    let body: any = null
                    if (response?.content) {
                        const resContents = Object.entries(response?.content)
                            .map(([key, value]) => {return key})
                        const exists = ARRAY_OBJECT.some(item => resContents.includes(item));
                        if (exists) {
                            const resContent = resContents.filter(item => item !== TYPE_FILE )
                            if (resContent.length > 0) {
                                const schemas = response?.content[resContent[0]]
                                let resName = schemas.schema.$ref?.split("/").pop();
                                const type = schemas.schema.type;
                                body = objectSchema[resName]
                                if (type === "array"){
                                    resName = schemas.schema.items.$ref?.split("/").pop();
                                    body = [objectSchema[resName]];
                                }else if (type === "string"){
                                    body = "string"
                                }else if (type === "object"){
                                    body = schemas?.example
                                }
                            }
                        }
                    }

                    if (status !== 200){
                        body = {
                            "error": response?.description
                        }
                    }

                    responses.push({
                        status,
                        description: response?.description,
                        data: body,
                    })
                    /*if (!responseMap.has(status)) {
                        responseMap.set(status, [])
                    }

                    const variants = responseMap.get(status) || []
                    variants.push({
                        description: response.description || "No description",
                        data:
                            response.content && response.content["application/json"]
                                ? {
                                    schema: response.content["application/json"].schema,
                                    example: {
                                        message: "Response example",
                                        data: {},
                                    },
                                }
                                : { message: response.description || "Success" },
                    })*/
                })
            }

            // Convert response map to array format
            /*const responses = Array.from(responseMap.entries()).map(([status, variants]) => ({
                status,
                variants,
            }))*/

            const endpoint: ApiEndpoint = {
                id: `${operationId}_${endpointIdCounter++}`,
                name: operation.summary || operationId,
                method: method.toUpperCase() as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
                path: pathName,
                description: operation.description || operation.summary || "",
                headers: headers.length > 0 ? headers : undefined,
                params: params.length > 0 ? params : undefined,
                body,
                bodyContent: bodyContent,
                responses,
                server
            }

            // Add endpoint to all associated services
            tags.forEach((tag: string) => {
                let service = serviceMap.get(tag)
                if (service) {
                    service?.endpoints?.push(endpoint)
                }
                /*if (!service) {
                    service = {
                        id: tag.toLowerCase().replace(/\s+/g, "-"),
                        name: tag,
                        description: "",
                        endpoints: [],
                    }
                    serviceMap.set(tag, service)
                }*/
            })
        })
    })

    return Array.from(serviceMap.values())
}

// generate gia tri mau cho type string
function generateExampleValueTypeString(property: any): any {
    switch (property.format) {
        case "date":
            return property?.example || dayjs().format("YYYY-MM-DD")
        case "date-time":
            return property?.example || dayjs().format("YYYY-MM-DDTHH:mm:ssZ")
        default:
            return property?.example || "string"
    }
}

// Hàm generate giá trị mẫu dựa vào kiểu dữ liệu
function generateExampleValue(property: any): any {
    switch (property.type) {
        case "string":
            return generateExampleValueTypeString(property);
        case "number":
        case "integer":
            return property?.example || 0
        case "boolean":
            return property?.example || true
        case "object":
            return property?.example || {}
        case "array":
            return property?.example || []
        default:
            return property?.example
    }
}

// Chuyển đổi schema Swagger thành object JSON
export function swaggerSchemaToJson(
    schema: SwaggerSchema,
    schemaMap: Record<string, SwaggerSchema> = {},
): ParsedObject {
    const result: ParsedObject = {}

    if (!schema.properties) {
        return result
    }

    for (const [key, property] of Object.entries(schema.properties)) {
        // Nếu là reference ($ref)
        if (property.$ref) {
            const refName = property.$ref.split("/").pop()
            if (schemaMap[refName]) {
                result[key] = swaggerSchemaToJson(schemaMap[refName], schemaMap)
            }
        }
        // Nếu là array
        else if (property.type === "array") {
            if (property.items?.$ref) {
                const refName = property.items.$ref.split("/").pop()
                result[key] = schemaMap[refName] ? [swaggerSchemaToJson(schemaMap[refName], schemaMap)] : []
            } else {
                result[key] = []
            }
        }
        // Nếu là object
        else if (property.type === "object") {
            result[key] = property.properties ? swaggerSchemaToJson(property, schemaMap) : {}
        }
        // Giá trị đơn giản
        else {
            result[key] = generateExampleValue(property)
        }
    }

    return result
}

// Parse toàn bộ Swagger components schemas
export function parseSwaggerSchemas(schemas: Record<string, SwaggerSchema>) {
    const result: Record<string, any> = {}

    for (const [name, schema] of Object.entries(schemas)) {
        result[name] = swaggerSchemaToJson(schema, schemas)
    }

    return result
}

// get type of field
export function getType(schema?: any){
    const type = schema ? schema.type : null
    switch (type) {
        case "number":
        case "integer":
            return type + "($" + schema?.format + ")"
        case "array":
            return type + "<" + schema?.items?.type + ">"
        default:
            return type
    }
}

// get description of field
export function getDescription(description:string, schema?: any){
    if (schema?.enum){
        description = description + "(" + schema?.enum.join(", ") + ")"
    }

    return description
}

// @ts-ignore
export async function getAllApiServicesFromSwagger(nameFile: string): ApiService[]{
    axios.get( process.env.NEXT_PUBLIC_API_MIS_BASE_URL + "/api/files", {
        params: {
            nameFile,
        }
    }).then(r => {
        let arr: ApiService[] = []
        r.data.forEach((data: any) => {
            const swagger: SwaggerSpec = data
            const apiObs = swaggerToApiServices(swagger, data)
            arr = arr.concat(apiObs)
        })
        return arr;
    }).catch(e => {
        return []
    })
}
