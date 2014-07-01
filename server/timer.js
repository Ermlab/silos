/**
 * Created by radek on 01.07.14.
 */
if (Meteor.isServer) {
    Meteor.setInterval( function(){
       // console.log("Timer");
       // console.log((new Date).setMonth((new Date).getMonth()-1));
        Logs.remove({ LogDate: { $lt: (new Date).setMonth((new Date).getMonth()-1) } });
    }, 1000 );
}