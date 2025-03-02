<template>
  <div>
    <div class="modal fade" id="info-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
       <div class="modal-dialog" role="document">
          <div class="info-modal-content modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="font-weight:bold" id="exampleModalLongTitle">Welcome to Shoppal CMS!</h5>
              <button type="button" @click="$emit('closeShowInfo')" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="info-modal-text-container">
                <h1 class="text-center mb-3">Tech Stack</h1>
                <div class="card-deck row" id="tech-stack-deck">
                  <!-- <Techstack
                  v-for="tech in techs"
                  :key="tech"
                  :tech="tech"
                  :src="require(`../assets/ + ${tech}`)"
                  :alt="tech"
                  >
                  </Techstack> -->

                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/HTML5.svg" alt="HTML5">
                           <div class="card-body">
                             <h5 class="card-title text-center">HTML5</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/CSS3.svg" alt="CSS3">
                           <div class="card-body">
                             <h5 class="card-title text-center">CSS3</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/BootstrapVue.png" alt="BootstrapVue">
                           <div class="card-body">
                             <h5 class="card-title text-center">BootstrapVue</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/Vue.js.svg" alt="Vue.js">
                           <div class="card-body">
                             <h5 class="card-title text-center">Vue.js</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/Express.svg" alt="Express">
                           <div class="card-body">
                             <h5 class="card-title text-center">Express</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/Sequelize.svg" alt="Sequelize">
                           <div class="card-body">
                             <h5 class="card-title text-center">Sequelize</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/Node.js.svg" alt="Node.js">
                           <div class="card-body">
                             <h5 class="card-title text-center">Node.js</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/PostgresSQL.svg" alt="PostgresSQL">
                           <div class="card-body">
                             <h5 class="card-title text-center">PostgresSQL</h5>
                         </div>
                      </div>
                  </div>
                  <div class="col-4">
                       <div class="card">
                           <img class="card-img-top" src="../assets/JavaScript.svg" alt="JavaScript">
                           <div class="card-body">
                             <h5 class="card-title text-center">JavaScript</h5>
                         </div>
                      </div>
                  </div>
                </div>
                <div class="description">
                  <h2>Description</h2>
                  <p>
                    A web application for managing an online store which is on a separate website,
                    <a href="https://shoppal-client-rdport.onrender.com">Shoppal</a>.
                  </p>
                  <h2>Github</h2>
                  <ul>
                    <li><a href='https://github.com/rdport/shoppal-cms-client.git'>shoppal-cms-client</a></li>
                    <li><a href='https://github.com/rdport/shoppal-client.git'>shoppal-client</a></li>
                    <li><a href='https://github.com/rdport/shoppal-server.git'>shoppal-server</a></li>
                  </ul>
                  <h2>Features</h2>
                    <ul>
                        <li>Only users with the role of "admin" can sign in</li>
                        <li>Create, edit, delete, sort and filter categories and products</li>
                        <li>Responsive design enables this website to adapt to the size of the screen</li>
                    </ul>
                    <h2>P.S.</h2>
                    <ul>
                      <li>The following users have been added to the database:<br>
                            <br>
                            <p class="mb-0" style="font-weight:bold">John Doe</p>
                            email: johndoe@mail.com<br>
                            password: 123456<br>
                            role: admin<br>
                            <br>
                            <p class="mb-0" style="font-weight:bold">Jane Doe</p>
                            email: janedoe@mail.com<br>
                            password: 123456<br>
                            role: customer
                        </li><br>
                      <li>Simple authentication is used for the purpose of prototyping, where the access token and full name are stored in the local storage.</li>
                      <li>Please check out the "Fancytodo" project which has implemented more advanced authentication with secure access token, csrf token and refresh token.</li>
                      <li><a href="https://github.com/rdport/fancytodo-client.git">Fancytodo-client on github</a>, <a href="https://github.com/rdport/fancytodo-server.git">Fancytodo-server on github</a>, <a href="https://fancytodo-client.onrender.com">Fancytodo website</a></li>
                      <li>The frontend, backend and database of this project use free-tier hosting so this website might not always be accessible and a significant initial loading time is expected.</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="$emit('closeShowInfo')" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Info',
  data () {
    return {
      techs: ['HTML5', 'CSS3', 'BootstrapVue', 'Vue.js', 'Express', 'Sequelize', 'Node.js', 'PostgresSQL', 'JavaScript']
    }
  }
}
</script>
<style>
</style>
