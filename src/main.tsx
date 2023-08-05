import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import { App } from 'components/App';
import { LoginProvider } from 'contexts/LoginContext';
import 'assets/index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ globalStyles: () => ({ body: { backgroundColor: '#242424' } }) }}
			>
				<LoginProvider>
					<App />
				</LoginProvider>
			</MantineProvider>
	</StrictMode>
);
