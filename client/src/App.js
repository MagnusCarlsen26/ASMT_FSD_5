import Feedbackform from './components/Feedbackform'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import History from './components/History';

const App = () => {

  return (
    <Router>
        <div>
            <Routes>
              <Route path="/" element={<Feedbackform />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
    </Router>
  );
};

export default App;
