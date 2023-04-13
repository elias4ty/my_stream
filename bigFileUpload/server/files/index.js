function upload() {
  return async (ctx) => {
    console.log(ctx.request.body);

    ctx.body = {
      status: 200,
      body: ctx.request.body || 'fuck body'
    }
  };
}

module.exports = upload;