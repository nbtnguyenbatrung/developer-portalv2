
import {useLanguage} from "@/contexts/language-context";
import {DownloadFile} from "@/types/api";
import {Archive, Book, Download, File, FileText, Image, Video} from "lucide-react";

interface DownloadFileViewProps{
    downloads: DownloadFile[]
}

export default function DownloadFileView({downloads}: DownloadFileViewProps) {

    const {t} = useLanguage()
    const getIcons = (icons: string)=>{
        switch(icons.toLowerCase()){
            case 'book':
                return <Book className="w-6 h-6" />
            case 'file':
                return <File className="w-6 h-6" />
            case 'archive':
                return <Archive className="w-6 h-6" />
            case 'image':
                return <Image className="w-6 h-6" />
            case 'video':
                return <Video className="w-6 h-6" />
            case "filetext":
                return <FileText className="w-6 h-6" />
            default:
                return null
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {downloads.map((item: DownloadFile) => (
                <div
                    key={item.id}
                    className="group border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                            {getIcons(item.icon)}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {item.fileType}
                        </span>
                                    <span>{item.fileSize}</span>
                                </div>
                                <button className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                    {t("download")}
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
