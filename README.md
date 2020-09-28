# DGOATEST-VERSION-CONTROL-SYSTEM
My own VCS using HTML, Javascript, Node.js with Express <br />

# CECS 343 VCS Project 1 Section 01
Deron Washington II <br />

# Introduction:
Create a repository for the given project source tree (including a
“snapshot” of “all” its files) within the project. <br />

# Contents:
<ul> 
 <li> CECS343P1_WBS.pdf </li>
 <li> get-form-text.pug </li>
 <li> index.pug         </li>
 <li> layout.pug        </li>
 <li> app.js            </li>
 <li> README.txt        </li>
</ul>

# External Requirements:
<ul> 
 <li> Download: Node.js  to access Javascript on your local machine (server-side)</li>
</ul> 

# Setup and Installation 
<ul> Enter all the commands into your terminal that you will be running this project through
  <li> Download pug (formally Jade): npm install pug </li>
  <li> Download path: npm install path               </li>
  <li> Download express: npm install express         </li>
  <li> Download fs: npm install fs                   </li>
  <li> Download glob: npm install glob               </li>   
</ul>
  
 # Sample Invocation:
 Input: <br />
 The directory you would like to make a repository for and the directory where you would like to store the repo in the input boxes on the website (http://localhost:3000/). <br />
 Ex. CREATE REPOSITORY FOR <full path of the project directory to make repo from> <br />
  STORE <full path of where you want to store the repository> 

<br /> Output: <br />
A message detailing if the operation was successful or not. Also your repository will be created where you specified in the second input box. <br />
Ex. Your repository has been created or updated from <full path of the project directory to make repo from> and stored here: <full path of where you want to store the repository> <br />
  
  
# Features:
<ul>
  <li> Create a repository </li>
  <li> Snapshot Functionality to store the results of multiple repository entries </li>
  <li> Creates a manifest file that is stored in the home directory of both of the directories you entered </li>
 </ul>
