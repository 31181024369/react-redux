import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';
const TabsContent=()=>{
    return (
        <>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 mt-3"
    >
      <Tab eventKey="user" title="User">
         <UsersTable></UsersTable>
      </Tab>
      <Tab eventKey="blog" title="Blog">
        Tab content for Profile
      </Tab>
    </Tabs>
        </>
    )
}
export default TabsContent