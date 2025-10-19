package org.ll.mspa.nav

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable


@Serializable
sealed interface MspaNavKey: NavKey{
    @Serializable
    data object SignIn: MspaNavKey
    @Serializable

    data object Main: MspaNavKey
    @Serializable

    data object PetExplorer: MspaNavKey
    @Serializable

    data object VirtualPet: MspaNavKey
    @Serializable

    data object PetDetail: MspaNavKey
}
