
      let date_ob = new Date();

      // current date
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);
      
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      
      // current year
      let year = date_ob.getFullYear();
      
      // current hours
      let hours = date_ob.getHours();
      
      // current minutes
      let minutes = date_ob.getMinutes();
      
      // current seconds
      let seconds = date_ob.getSeconds();
      
      
      // prints date in YYYY-MM-DD format
      var YMD = year + "-" + month + "-" + date;
      
      // prints date & time in YYYY-MM-DD HH:MM:SS format
      var YMDHMS = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
      
      // prints time in HH:MM format
      var HM = hours + ":" + minutes ;
      var YMDHMS_mili_sec = YMDHMS + ":" + date_ob.getMilliseconds();
      exports.currentDateTimeSec = YMDHMS_mili_sec
      
      