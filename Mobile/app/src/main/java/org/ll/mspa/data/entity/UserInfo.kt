package org.ll.mspa.data.authentication.entity

import kotlinx.serialization.Serializable

@Serializable
data class UserInfo(
    val firstname: String,
    val lastname: String,
    val email: String,
    val accessToken: String
)