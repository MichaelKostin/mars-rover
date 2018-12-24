const NodeSSH = require('node-ssh');
const path = require('path');
const ssh = new NodeSSH();
const Winston = require('winston');
const REMOTE_WORK_DIR = '/home/pi/rover';
const SERVER_DIR = __dirname;
const FRONT_DIR = path.resolve(__dirname, '../front/build');

var logger = new Winston.Logger({
  transports: [
    new Winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true
    })
  ]
});

const config = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

if (!config.host || !config.username || !config.password) {
  throw new Error('SSH config is not specified');
}

ssh.connect(config)
  .then(() => deployDirectory(SERVER_DIR, REMOTE_WORK_DIR))
  //.then(() => deployDirectory(FRONT_DIR, `${REMOTE_WORK_DIR}/static`))
  .then(() => execCommand('npm i'))
  .then(() => execWithStream('NODE_ENV=production npm start'))
  .catch((err) => logger.error(err));

function deployDirectory(from, to) {
  const failed = [];
  const successful = [];
  return ssh.putDirectory(from, to, {
    recursive: true,
    concurrency: 10,
    validate: function(itemPath) {
      const baseName = path.basename(itemPath);
      // do not allow node_modules
      return baseName.substr(0, 1) !== '.' && baseName !== 'node_modules';
    },
    tick: function(localPath, remotePath, error) {
      if (error) {
        failed.push(localPath);
      } else {
        successful.push(localPath);
      }
    }
  }).then(function(status) {
    logger.info('the directory transfer was', status ? 'successful' : 'unsuccessful');
    logger.info('failed transfers', failed.join('\n'));
    logger.info('successful transfers: \n\n', successful.join('\n'));
  });
}

function execCommand(command) {
  return ssh.execCommand(command, { cwd: REMOTE_WORK_DIR })
    .then((result)=> {
      if (result.stderr) {
        logger.error(result.stderr)
      }

      if (result.stdout) {
        logger.info(result.stdout)
      }

      logger.info('[', command, '] FINISHED');
    });
}

function execWithStream(command, options = []) {
  return ssh.exec(command, options, {
    cwd: REMOTE_WORK_DIR,
    onStdout(chunk) {
      logger.info(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      logger.error(chunk.toString('utf8'));
    }
  });
}
