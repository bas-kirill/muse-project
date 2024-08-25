package mu.muse.common.rest

open class ClientException(override val message: String) : RuntimeException(message)
open class ServerException(override val message: String) : RuntimeException(message)
