import UserHome from '../pages/user/UserHome.jsx';
import BusinessSummary from '../pages/Dashboard/BusinessSummary.jsx';
import AuditForm from '../components/AuditForm/AuditForm.jsx';

const routes = [
  {
    path: '/',
    element: <UserHome />,
  },
  {
    path: '/business-summary',
    element:
      <BusinessSummary />
  },
  {
    path: '/audit-form',
    element: <AuditForm onClose={() => window.history.back()} />,
  },
];

export default routes;