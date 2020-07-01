var isLoaded = false;
function loadUsersData(){

    if(isLoaded) {
        var btn = document.getElementById('add'); 
            
        btn.addEventListener('click', function(args) {
            var hwid = document.getElementById('hwid');
            var ip = document.getElementById('ip');
            var Active = document.getElementById('Active').checked;
            var ChangedIp = document.getElementById('ChangedIp').checked;
            
            var userData = {
                hwid: hwid.value, 
                ip: ip.value,
                Active: Active,
                ChangedIp: ChangedIp
            }; 
            $.ajax({
                url: '/admin/users',
                accepts: 'application/json',
                data:userData,
                method: 'PUT',
                success: function (data) {
                    reloadData(data);
                }
            });
            hwid.value = '';
            ip.value = '';
        }); 
        loadData();return;
    }
    isLoaded = true;
        function reloadData(_data){
            var dt = '';
            _data.forEach(function(user){ 
                dt+= `<tr> 
                <th style='text-align: center;' scope="row">`+ 
                `<button type="button" _id='${user._id}' ac="del" style="margin-right: 5px;" class="btn btn-lg btn-danger" ><span class="fa fa-trash"></span></button>`+
                `<button type="button" _id='${user._id}' ac="edit" class="btn-primary btn btn-lg" ><span class="fa fa-save"></span></button>`+
                ` </th>
                    <td> <input class="form-control input-lg" type="text" id='${user._id}hwid'  placeholder='${user.hwid}' value='${user.hwid}'/> </td>
                    <td> <input class="form-control input-lg" type="text" id='${user._id}ip'  placeholder='${user.userIp}' value='${user.userIp}'/> </td>
                    <td>
                        <div class="checkbox checbox-switch switch-success">
                            <label style="vertical-align: middle; ">
                                <input type="checkbox" id='${user._id}Active' placeholder='${user.Active}' ${user.Active?'checked':''} class="checkbox checbox-switch switch-success" />
                                <span></span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <div class="checkbox checbox-switch switch-success">
                            <label style="vertical-align: middle; ">
                                <input type="checkbox" id='${user._id}ChangedIp' placeholder='${user.ChangedIp}' ${user.ChangedIp?'checked':''} class="checkbox checbox-switch switch-success" />
                                <span></span>
                            </label>
                        </div>
                    </td>
                    
                </tr>`
            }); 
            content.innerHTML = dt;
            var dels = content.getElementsByClassName('btn-danger');
            for(var i=0;i<dels.length;i++)  dels[i].addEventListener('click',deleteData);

            var dels = content.getElementsByClassName('btn-primary');
            for(var i=0;i<dels.length;i++)  dels[i].addEventListener('click',editData);

            var inputs = content.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++)  inputs[i].addEventListener('input',changeColor);
           
        }
        function changeColor(arg){
            var input = arg.currentTarget;
            var type = input.attributes['type'].value;
            if(type == 'checkbox'){
                
                if(input.placeholder != input.checked.toString()){
                    var id = input.id.replace('ChangedIp','').replace('Active','');
                    var hwid = document.getElementById(id+ 'hwid');
                    var ip = document.getElementById(id+ 'ip');
                    hwid.style.borderColor = 'red';
                    ip.style.borderColor = 'red';
                }
                else {
                    var id = input.id.replace('ChangedIp','').replace('Active','');
                    var hwid = document.getElementById(id+ 'hwid');
                    var ip = document.getElementById(id+ 'ip');
                    hwid.style.borderColor = '#ccc';
                    ip.style.borderColor = '#ccc';
                }
                return;
            }
            if(input.placeholder != input.value){
                input.style.borderColor = 'red';
            }
            else {
                input.style.borderColor = '#ccc';
            }
        }
        function loadData(){
          
            $.ajax({
                url: '/admin/jsonusers',
                accepts: 'application/json',
                method: 'GET',
                success: function (data) {
                    reloadData(data);
                    //isHidden();
                }
            });
        }
        function deleteData(args){

            //alert(args.currentTarget.attributes['_id'].value);
            var id = args.currentTarget.attributes['_id'].value;
            $.ajax({
                url: '/admin/users',
                accepts: 'application/json',
                data:{id:id},
                method: 'DELETE',
                success: function (data) {
                    reloadData(data);
                }
            });
        }
        function editData(args){

            //alert(args.currentTarget.attributes['_id'].value);
            var id = args.currentTarget.attributes['_id'].value;
            var hwid = document.getElementById(id+'hwid').value;
            var ip = document.getElementById(id+'ip').value;
            var Active = document.getElementById(id+'Active').checked;
            var ChangedIp = document.getElementById(id+'ChangedIp').checked;
            var userData = {
                id:id,
                hwid: hwid, 
                ip: ip,
                Active: Active,
                ChangedIp: ChangedIp,
            }; 
            $.ajax({
                url: '/admin/users',
                accepts: 'application/json',
                data:userData,
                method: 'POST',
                success: function (data) {
                    reloadData(data);
                }
            });
        }
        // window.onload = function() { 
        loadData();
        var btn = document.getElementById('add'); 
            
        btn.addEventListener('click', function(args) {
            var hwid = document.getElementById('hwid');
            var ip = document.getElementById('ip');
            var Active = document.getElementById('Active').checked;
            var ChangedIp = document.getElementById('ChangedIp').checked;
            
            var userData = {
                hwid: hwid.value, 
                ip: ip.value,
                Active: Active,
                ChangedIp: ChangedIp
            }; 
            $.ajax({
                url: '/admin/users',
                accepts: 'application/json',
                data:userData,
                method: 'PUT',
                success: function (data) {
                    reloadData(data);
                }
            });
            hwid.value = '';
            ip.value = '';
        }); 
    }
    
     
    // }