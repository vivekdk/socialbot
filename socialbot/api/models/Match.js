module.exports = {
  tableName: 'match',
  attributes: {

    matchId : {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },

    name: {
      type: 'string',
      required : true,
      size: 100
    },

    description : {
      type : 'string',
      required : true,
      size : 1000
    },

    startTime : {
      type : 'datetime',
      required : true
    },
    endTime : {
      type : 'datetime',
      required : true
    },

    min : {
      type : 'integer',
      defaultsTo : 2,
      required : true
    },

    max : {
      type : 'integer',
      required : true
    },

    count : {
      type : 'integer',
      defaultsTo : 0
    },

    by : {
      type : 'string',
      required : true
    }
  }
}