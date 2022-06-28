import { AuthType } from './AuthTypes'
import { UserAddressType } from './UserAddressTypes'
import { UserCommunicationType } from './UserCommunicationTypes'
import { UserEmailSettingsType } from './UserEmailSettingTypes'
import { UserSocialNetworksType } from './UserSocialNetworkTypes'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const IS_LOGIN = 'IS_LOGIN'

export type LoginActionType = {
    id: number
    username: string
    password: string | undefined
    email: string
    first_name: string
    last_name: string
    fullname?: string
    occupation?: string
    companyName?: string
    phone?: string
    roles?: Array<number>
    pic?: string
    language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
    timeZone?: string
    website?: 'https://keenthemes.com'
    emailSettings?: UserEmailSettingsType
    auth?: AuthType
    communication?: UserCommunicationType
    address?: UserAddressType
    socialNetworks?: UserSocialNetworksType
}
export type FeedbackLoginType = {
    access_token: string
    level: string
    refresh_token: string
    user_id: string
}