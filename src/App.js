import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/archive/home/components/Homepage';
import Dashboard from './pages/archive/dashboard/components/Dashboard';
import Materials from './pages/archive/materials/components/Materials';
import UploadMaterial from './pages/archive/upload materials/components/UploadMaterial';
import CustomText from './pages/archive/custom text/components/CustomText';
import UserEdit from './pages/archive/edit/components/UserEdit';

import AdminDashboard from './pages/archive/admin/dashboard/components/AdminDashboard';
import Account from './pages/archive/admin/account/Account';
import CreateAccount from './pages/archive/admin/create/components/CreateAccount';
import UpdateAccount from './pages/archive/admin/update/UpdateAccount';
//import AuditTrail from './pages/archive/admin/audit trail/AuditTrail';

import MaterialsCharacter from './pages/archive/materials character/MaterialsCharacter';
import Header from './global/components/user/Header'

import LandingPage from './pages/user/landing page/components/LandingPage';
import Home from './pages/user/home/components/Home';
import DashboardHeader from './global/components/user/DashboardHeader';
import Library from './pages/user/library/components/Library';
import ClassSettings from './pages/user/class settings/components/ClassSettings';
import UploadBooks from './pages/user/upload/components/UploadBooks';
import TextToBraille from './pages/user/text-to-braille/components/TextToBraille';
import Profile from './pages/user/profile/components/Profile';
import DeviceSettings from './pages/user/devide settings/components/DeviceSettings';
import Analytics from './pages/user/analytics/components/Analytics';
import EditSection from './pages/user/edit section/components/EditSection';
import CreateSection from './pages/user/create section/components/CreateSection';
import AddStudent from './pages/user/add student/components/AddStudent';
import ViewStudent from './pages/user/view student/components/ViewStudent';
import EditProfile from './pages/user/edit user/components/EditProfile';
import BookDetails from './pages/user/book details/components/BookDetails';
import BookSession from './pages/user/book session/components/BookSession';
import AdminHome from './pages/aadmin/admin home/components/AdminHome';
import ManageLibrary from './pages/aadmin/manage library/components/ManageLibrary';
import ManageAccounts from './pages/aadmin/manage accounts/components/ManageAccounts';
import ContentRequest from './pages/aadmin/content request/components/ContentRequest';
import AdminUploadBooks from './pages/aadmin/admin upload books/components/AdminUploadBooks';
import AdminCreateAccount from './pages/aadmin/admin create account/components/AdminCreateAccount';
import AccountActivation from './pages/user/account activation/components/AccountActivation';
import AdminViewBook from './pages/aadmin/admin view book/components/AdminViewBook';
import AdminViewReal from './pages/aadmin/admin view real/components/AdminViewReal';
import AdminCreateAccountTempt from './pages/aadmin/admin create temporary/components/AdminCreateAccountTempt';
import AdminEditUser from './pages/aadmin/admin edit user/components/AdminEditUser';
import EditStudent from './pages/user/edit student/components/EditStudent';
import AuditTrail from './pages/aadmin/audit trail/AuditTrail';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<Navigate to="/home" replace />} />



          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/materials' element={<Materials />}></Route>
          <Route path='/upload' element={<UploadMaterial />}></Route>
          <Route path='/custom' element={<CustomText />}></Route>
          <Route path='/profile/edit' element={<UserEdit />}></Route>
          <Route path='/bd' element={<BookDetails />}></Route>
          <Route path='/char' element={<MaterialsCharacter />}></Route>

          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
          <Route path='/admin/account' element={<Account />}></Route>
          <Route path='/admin/create' element={<CreateAccount />}></Route>
          <Route path='/admin/update' element={<UpdateAccount />}></Route>
          <Route path='/admin/audittrail' element={<AuditTrail />}></Route>
          
*/}
          <Route path="/" element={<LandingPage />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/library' element={<Library />}></Route>
          <Route path='/class' element={<ClassSettings />}></Route>
          <Route path='/upload' element={<UploadBooks />}></Route>
          <Route path='/text-to-braille' element={<TextToBraille />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/device-settings' element={<DeviceSettings />}></Route>
          <Route path='/analytics' element={<Analytics />}></Route>
          <Route path='/section/edit' element={<EditSection />}></Route>
          <Route path='/section/create' element={<CreateSection />}></Route>
          <Route path='/student/add' element={<AddStudent />}></Route>
          <Route path='/student/view' element={<ViewStudent />}></Route>
          <Route path='/edit/profile' element={<EditProfile />}></Route>
          <Route path='/book/detail' element={<BookDetails />}></Route>
          <Route path='/book/session' element={<BookSession />}></Route>

          <Route path='/admin/home' element={<AdminHome />}></Route>
          <Route path='/admin/library' element={<ManageLibrary />}></Route>
          <Route path='/admin/accounts' element={<ManageAccounts />}></Route>
          <Route path='/admin/content-request' element={<ContentRequest />}></Route>
          <Route path='/admin/upload-book' element={<AdminUploadBooks />}></Route>
          <Route path='/admin/create-account' element={<AdminCreateAccountTempt />}></Route>
          <Route path='/account-activation' element={<AccountActivation />}></Route>
          <Route path='/admin/approval/book' element={<AdminViewBook />}></Route>
          <Route path='/admin/view/book' element={<AdminViewReal />}></Route>
          <Route path='/admin/edit-account' element={<AdminEditUser />}></Route>
          <Route path='/student/edit' element={<EditStudent />}></Route>
          <Route path='/admin/audit-trail' element={<AuditTrail />}></Route>


          <Route path='/admin/create/account' element={<AdminCreateAccount />}></Route>


          <Route path='/try' element={<EditStudent />}></Route>

        </Routes>
      </BrowserRouter>


    </>

  );
}

export default App;
