// @formatter: off

val POSTGRES_USER_ENV = System.getenv("POSTGRES_USER") ?: throw RuntimeException("`POSTGRES_USER` env not found")
val POSTGRES_PASSWORD_ENV = System.getenv("POSTGRES_PASSWORD") ?: throw RuntimeException("`POSTGRES_PASSWORD` env not found")
val POSTGRES_DB = System.getenv("POSTGRES_DB") ?: throw RuntimeException("`POSTGRES_DB` env not found")
val SERVER_JDBC_URL_ENV = System.getenv("POSTGRES_DSN") ?: throw RuntimeException("`SERVER_JDBC_URL` env not found")

// @formatter: on
