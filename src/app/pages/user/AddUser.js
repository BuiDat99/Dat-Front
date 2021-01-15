import React from "react";
import makeRequest from '../../libs/request';
import { showSuccessMessageIcon, showErrorMessage } from '../../actions/notification';
import ButtonLoading from "../../partials/common/ButtonLoading";
import SelectForm from '../../partials/common/SelectForm';
import { ACTIVE_STATUS } from '../../config/common/testme'
import {AddUser} from 'base_user';

const Add_User = (props) => {
    const inputNameRef = React.createRef();
    const inputEmailRef = React.createRef();
    const inputRoleRef = React.createRef();
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">                      
                        <AddUser                           
                            ButtonLoading={ButtonLoading} SelectForm={SelectForm} ACTIVE_STATUS={ACTIVE_STATUS}      
                            makeRequest={makeRequest} showSuccessMessageIcon={showSuccessMessageIcon}  showErrorMessage={showErrorMessage}  
                            inputNameRef={inputNameRef} inputEmailRef={inputEmailRef}  inputRoleRef={inputRoleRef}           
                        />
                    </div>
                </div>
            </div>
        </>
    );

}
export default Add_User;