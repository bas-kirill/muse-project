package mu.muse.usecase

import mu.muse.domain.Password
import mu.muse.domain.Username

fun interface BasicLogin {

    fun execute(username: Username, password: Password): String
}
