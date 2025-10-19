package org.ll.mspa

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.ui.Modifier
import org.ll.mspa.feature.main.screen.SignInUpScreen
import org.ll.mspa.nav.MspaNavGraph
import org.ll.mspa.ui.theme.MspaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MspaTheme {
                MspaNavGraph(Modifier)
            }
        }
    }
}

