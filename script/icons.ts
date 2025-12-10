
import {
    CreditCard,
    IdCard,
    PiggyBank,
    QrCode,
    Send,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react'

export const icons = (icon: string) : any => {
    switch (icon) {
        case "CreditCard":
            return CreditCard
        case "IdCard":
            return IdCard
        case "PiggyBank":
            return PiggyBank
        case "QrCode":
            return QrCode
        case "Send":
            return Send
        case "TrendingUp":
            return TrendingUp
        case "Users":
            return Users
        case "Zap":
            return Zap
        default:
            return null
    }
}
