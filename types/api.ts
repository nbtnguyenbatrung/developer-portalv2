export interface ApiEndpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  headers?: Array<{
    key: string
    value: string
    required: boolean
    type: string
    description: string
  }>
  params?: Array<{
    key: string
    value: string
    required: boolean
    type: string
    description: string
    in: string
  }>
  body?: any
  bodyContent?: Array<string> | null
  responses: Array<{
    status: number
    description: string
    data: any
  }>
  server?: string
}

export interface ApiService {
  id: string
  code: string
  name: string
  description: string
  server: string
  endpoints?: Array<ApiEndpoint>
}

export interface SwaggerSpec {
  tags?: Array<{ name: string; description?: string }>
  servers: Array<{ url: string; description?: string }>
  paths: Record<
    string,
    Record<
      string,
      {
        tags?: string[]
        summary?: string
        description?: string
        operationId?: string
        parameters?: Array<{
          name: string
          in: string
          description?: string
          required?: boolean
          schema?: any
        }>
        requestBody?: {
          description?: string
          required?: boolean
          content?: Record<string, any>
        }
        responses?: Record<string, any>
      }
    >
  >
}

export interface ParsedObject {
  [key: string]: any
}

export interface SwaggerSchema {
  type: string
  properties: Record<string, any>
  required?: string[]
  [key: string]: any
}

export interface Product {
  id: string
  icon: any
  title: string
  subTitle: string
  slug: string
  summary: string
  active: boolean
  featured: boolean
  priority: number
  viewUrl: {
      url: string,
      type: string
  }
  features: Array<string>
  badge?: string
  category: string
  quantityApi: number
}

export interface HeroSectionData {
    text: string
    welcome: string
    welcome_sub: string
    btn_view_product: string
    btn_get_started: string
    image: Array<string>
    hero_section_title: string
    hero_section_subtitle: string
    hero_section_stat: Array<{title: string, quantity: number, suffix: string}>
}

export interface FeatureSectionData {
    feature_section: string
    feature_section_title: string
    feature_section_subtitle: string
}

export interface ProductSectionData {
    our_service: string
    our_service_title: string
    our_service_subtitle: string
}

export interface Faq {
    question: string
    content: string
}

export interface DownloadFile {
    id: number
    title: string
    description: string
    fileType: string
    fileSize: string
    icon: string
    link: string
}

export interface Document {
    id: string
    name: string
    docName: string
    version: Array<string>
    defaultVersion: string
    category: string
    slug: string
}

export interface RateLimit {
    name: string
    throttle: number
    unitThrottle: string
    quota: number
    unitQuota: string
    createDate: string
    modifyDate: string
}
