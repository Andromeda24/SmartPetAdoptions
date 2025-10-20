package org.ll.mspa.nav

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable
import org.ll.mspa.data.authentication.entity.UserInfo


@Serializable
sealed interface MspaNavKey: NavKey{
    @Serializable
    data object SignIn: MspaNavKey
    @Serializable
    data class Main(val user: UserInfo): MspaNavKey

    @Serializable
    data object ExistingMain: MspaNavKey

    @Serializable

    data class PetExplorer(val user: UserInfo): MspaNavKey
    @Serializable

    data class VirtualPet(val user: UserInfo): MspaNavKey
    @Serializable

    data object PetDetail: MspaNavKey


}
