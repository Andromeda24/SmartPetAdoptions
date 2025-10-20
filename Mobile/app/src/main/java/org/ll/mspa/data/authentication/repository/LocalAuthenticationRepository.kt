package org.ll.mspa.data.authentication.repository

import org.ll.mspa.data.authentication.entity.UserInfo


interface LocalAuthenticationRepository {
    fun retrieveAuthenticatedUser(): UserInfo?
    fun saveAuthenticatedUser(user: UserInfo)
    fun deleteAuthenticatedUser()
}
