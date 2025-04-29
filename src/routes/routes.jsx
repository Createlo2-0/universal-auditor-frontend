import UserHome from '../pages/user/UserHome.jsx';
import BusinessSummary from '../pages/Dashboard/BusinessSummary.jsx';
import AuditForm from '../components/AuditForm/AuditForm.jsx';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';

const routes = [
  {
    path: '/',
    element: <UserHome />,
  },
  {
    path: '/business-summary',
    element: (<ProtectedRoute
      isAllowed={localStorage.getItem('isDataSubmitted') === 'true'}
      redirectPath="/audit-form"
    >
      <BusinessSummary />
    </ProtectedRoute>),
  },
  {
    path: '/audit-form',
    element: <AuditForm onClose={() => window.history.back()} />,
  },
];

export default routes;