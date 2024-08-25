package mu.muse.usecase

open class ClientException(override val message: String) : RuntimeException(message)
open class ServerException(override val message: String) : RuntimeException(message)
