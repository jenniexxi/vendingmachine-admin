module.exports = function(app, drink) {
  
  var alert = require('alert');

  app.get('/', function (req, res) {
    res.render('main.ejs'); 
  });
  // req : submit 으로 받아오는 모든 값들
  // res : 뭔가 액션을 하려고할 때 쓴다.
  
  // submit 으로 받아오는 모든 데이터를 어떻게 처리할지 여기다가 다 적어준다.
  // app.post('/api/books', function (req, res) {
  //   res.render('');
  // });

  app.post('/loginCheck', function (req, res) {
  //err: 에러, result: 결과값
  
    memberInfo.find({ id: req.body.userId, password: req.body.userPw }, function(err, result) {
      if(err) {
        return res.status(500).json({error: err});
      } else if(result.length === 0) {
        //result 의 개수값을 length를 말한다. 그니까 전체의 개수를 말함.
        //입력한 값의 길이가 아니라
        alert("다시 입력해주세요.");
      } else {
        res.render('main');
      }
    });

  });
  
  app.post('/signup', function (req, res) {
    res.render('signUp');
  });
 

  app.post('/drinkManage', function (req, res) {

    drinkInfo.find({ id: req.body.userName }, function(err, result){
      if(result.length === 0) {
        var newDrinkInfo = new drinkInfo();
        newDrinkInfo.name = req.body.userName;
        newDrinkInfo.price = req.body.userPrice;
        newDrinkInfo.amount = req.body.userAmount;
        
        newDrinkInfo.save(function(err) {
          if(err) {
            console.error(err);
            // res.json({ result: 0 }); //에러가 있으면 0
            return;
          }
          // res.json({ result: 1 });
          res.redirect('/');
        });
        
      } else {
        alert("기존에 음료수가 있습니다.");
        var newDrinkInfo = new drinkInfo();
        newDrinkInfo.name = req.body.userName;
        newDrinkInfo.price = req.body.userPrice;
        newDrinkInfo.amount += req.body.userAmount;

        newDrinkInfo.save(function(err) {
          if(err) {
            console.error(err);
            return;
          }
          res.redirect('/');
        });
        
      }
    });
  });


  app.get('/delete', function (req, res) {
    res.render("delete");
  })


  app.get('/deletelist', function (req, res) {

    var opt = req.query.deleteopt;
    
    if(opt === "user_name")
    {
      memberInfo.deleteMany({ name: req.query.keyword }, function(err) {
        if(err) {
          console.log(err);
          return res.status(500).json({error: err});
        } 
        else
        {
            memberInfo.find(function(err, result) {
            res.render("memberinfo",{memberinfo:result});
          })
        }
        
      });
    }
    else
    {
      memberInfo.deleteMany({ id: req.query.keyword }, function(err) {
        if(err) {
          console.log(err);
          return res.status(500).json({error: err});
        }
        else
        {
            memberInfo.find(function(err, result) {
            res.render("memberinfo",{memberinfo:result});
          })
        }

      });
    }

  })

};





