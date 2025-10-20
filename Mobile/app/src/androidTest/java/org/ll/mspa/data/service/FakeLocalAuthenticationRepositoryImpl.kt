package org.ll.mspa.data.service

import org.ll.mspa.data.authentication.entity.UserInfo
import org.ll.mspa.data.authentication.repository.LocalAuthenticationRepository

class FakeLocalAuthenticationRepositoryImpl (

): LocalAuthenticationRepository {
    private var currentUser: UserInfo? = null

    override fun retrieveAuthenticatedUser(): UserInfo? {
        //TODO("Not yet implemented")
        return currentUser
    }

    override fun saveAuthenticatedUser(user: UserInfo) {
        //TODO("Not yet implemented")
        currentUser = user
    }

    override fun deleteAuthenticatedUser() {
        //TODO("Not yet implemented")
        currentUser = null
    }
}