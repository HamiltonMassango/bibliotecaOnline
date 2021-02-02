import File from '../models/File';

class ArquivoController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
}

export default new ArquivoController();
