package mu.muse.application.muse

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import mu.muse.usecase.JwtUsernameExtractor
import mu.muse.usecase.JwtValidator
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter

class JwtTokenFilter(
    private val jwtValidator: JwtValidator,
    private val userDetailsService: UserDetailsService,
    private val jwtUsernameExtractor: JwtUsernameExtractor,
) : OncePerRequestFilter() {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val authHeader = request.getHeader("Authorization")
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response)
            return
        }

        val token = authHeader.substring("Bearer ".length)
        val username = jwtUsernameExtractor.execute(token)

        if (username != null && SecurityContextHolder.getContext().authentication == null) {
            val userDetails: UserDetails = userDetailsService.loadUserByUsername(username.toStringValue())

            if (jwtValidator.execute(token)) {
                val authToken = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities,
                )

                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)

                SecurityContextHolder.getContext().authentication = authToken
            }
        }
        chain.doFilter(request, response)
    }
}
