import { ConfigProvider } from 'antd';
import Translate from './Translate';


const App: React.FC = () => {

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Translate />
    </ConfigProvider>
    )
};

export default App;