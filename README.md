<h3> Project description </h3>
<hr>
The project task was to make web application similar to websites where you can buy ticket for all kinds of festivals (for example <a href="http://gigstix.com"> gigstix </a>). There are several users (admin, host, buyer and unregisted user), and each of them has some permissions. Admin can control everything, approve events, see all users, all bought tickets, delete them etc. Host can add new events, edit them, see users that bought ticket for that events, see tickets for that events...Users can buy ticket for each event, edit their profiles, had some discounts if they had enough points (every bought ticket will add some points to the user depends on the cost of it). Unregisted user can only see those events and search, filter or sort them. 
On the backend I will store those information in database. I am using web api with custom jwt for authorizing users.

<a href="Projekat 2019_2020.pdf"> Original project text </a>

<h2> How to start a project? </h2>

First of all, you have two different branches. The first one is "master pw84-2014-web-projekat" and the second one is "Angular pw84-2014-web-projekat".

<h6> master branch: </h6>
<ol>
<li> Open project in Visual Studio </li>
<li> Make new local database (In AppData folder right click -> add new SQLServerDatabase -> Reservation.mdf (name)) </li>
<li> Add new query for that database, copy and uncomment content of Query1.sql </li>
<li> Change local path for in web config to your newly created database. </li>
<li> Run Ctrl+F5 </li>
</ol>

<h6> Angular branch: </h6>
<ol>
<li> Open project </li>
<li> Run ng serve in terminal </li>
</ol>

