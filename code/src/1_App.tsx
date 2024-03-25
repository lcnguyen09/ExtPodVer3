import UiContext from './contexts/ui.context';
import Layout from './2_Layout';
import Apollo from './3_Apollo';
import Route from './4_Route';
import './App.scss';

export default function App() {
	return (
		<UiContext.ManagedUIContext>
			<Layout>
				<Apollo>
					<Route />
				</Apollo>
			</Layout>
		</UiContext.ManagedUIContext>
	);
}
