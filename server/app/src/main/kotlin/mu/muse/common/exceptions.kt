package mu.muse.common

open class ClientException(override val message: String) : RuntimeException(message)
open class ServerException(override val message: String) : RuntimeException(message)
