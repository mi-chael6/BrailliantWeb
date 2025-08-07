import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './src/pages/archive/home/components/Homepage';
import Dashboard from './src/pages/archive/dashboard/components/Dashboard';
import Materials from './src/pages/archive/materials/components/Materials';
import UploadMaterial from './src/pages/archive/upload materials/components/UploadMaterial';
import CustomText from './src/pages/archive/custom text/components/CustomText';
import UserEdit from './src/pages/archive/edit/components/UserEdit';

import AdminDashboard from './src/pages/archive/admin/dashboard/components/AdminDashboard';
import Account from './src/pages/archive/admin/account/Account';
import CreateAccount from './src/pages/archive/admin/create/components/CreateAccount';
import UpdateAccount from './src/pages/archive/admin/update/UpdateAccount';
//import AuditTrail from './pages/archive/admin/audit trail/AuditTrail';

import MaterialsCharacter from './src/pages/archive/materials character/MaterialsCharacter';
import Header from './src/global/components/user/Header'

import LandingPage from './src/pages/user/landing page/components/LandingPage';
import Home from './src/pages/user/home/components/Home';
import DashboardHeader from './src/global/components/user/DashboardHeader';
import Library from './src/pages/user/library/components/Library';
import ClassSettings from './src/pages/user/class settings/components/ClassSettings';
import UploadBooks from './src/pages/user/upload/components/UploadBooks';
import TextToBraille from './src/pages/user/text-to-braille/components/TextToBraille';
import Profile from './src/pages/user/profile/components/Profile';
import DeviceSettings from './src/pages/user/devide settings/components/DeviceSettings';
import Analytics from './src/pages/user/analytics/components/Analytics';
import EditSection from './src/pages/user/edit section/components/EditSection';
import CreateSection from './src/pages/user/create section/components/CreateSection';
import AddStudent from './src/pages/user/add student/components/AddStudent';
import ViewStudent from './src/pages/user/view student/components/ViewStudent';
import EditProfile from './src/pages/user/edit user/components/EditProfile';
import BookDetails from './src/pages/user/book details/components/BookDetails';
import BookSession from './src/pages/user/book session/components/BookSession';
import AdminHome from './src/pages/aadmin/admin home/components/AdminHome';
import ManageLibrary from './src/pages/aadmin/manage library/components/ManageLibrary';
import ManageAccounts from './src/pages/aadmin/manage accounts/components/ManageAccounts';
import ContentRequest from './src/pages/aadmin/content request/components/ContentRequest';
import AdminUploadBooks from './src/pages/aadmin/admin upload books/components/AdminUploadBooks';
import AdminCreateAccount from './src/pages/aadmin/admin create account/components/AdminCreateAccount';
import AccountActivation from './src/pages/user/account activation/components/AccountActivation';
import AdminViewBook from './src/pages/aadmin/admin view book/components/AdminViewBook';
import AdminViewReal from './src/pages/aadmin/admin view real/components/AdminViewReal';
import AdminCreateAccountTempt from './src/pages/aadmin/admin create temporary/components/AdminCreateAccountTempt';
import AdminEditUser from './src/pages/aadmin/admin edit user/components/AdminEditUser';
import EditStudent from './src/pages/user/edit student/components/EditStudent';
import AuditTrail from './src/pages/aadmin/audit trail/AuditTrail';


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
