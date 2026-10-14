package snippets.layout.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
// #region show
@Composable
fun ProfileCard(content: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.padding(AppSpacing.large), verticalArrangement = Arrangement.spacedBy(AppSpacing.medium), content = content)
}
// #endregion
