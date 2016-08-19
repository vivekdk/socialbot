/**
 * WebapiController
 *
 * @description :: Server-side logic for managing webapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `WebapiController.create()`
   */
  create: function (req, res) {
    req.body.startTime = new Date(req.body.startTime);
    req.body.endTime = new Date(req.body.endTime);
    var data = {
      match : req.body
    };

    MatchService.createMatch (data, function (err, match){
      return res.json(match);      
    })
  },

  /**
   * `WebapiController.join()`
   */
  join: function (req, res) {
    return res.json({
      todo: 'join() is not implemented yet!'
    });
  },


  /**
   * `WebapiController.comment()`
   */
  comment: function (req, res) {
    return res.json({
      todo: 'comment() is not implemented yet!'
    });
  },

    /**
   * `WebapiController.comment()`
   */
  getAllMatches: function (req, res) {
    return res.json({
      todo: 'getAllMatches() is not implemented yet!'
    });
  }
};

