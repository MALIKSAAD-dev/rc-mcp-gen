import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Landing from './pages/Landing';
import Generator from './pages/Generator';
import Setup from './pages/Setup';
import Contributor from './pages/Contributor';

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/generator" element={<Generator />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/contributor" element={<Contributor />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
