import Books from '../models/Books';
import User from '../models/User';
import File from '../models/File';

import * as Yup from 'yup';

class BooksController {
  async store(req, res, next) {
    const shema = Yup.object().shape({
      name: Yup.string().required(),
      editora: Yup.string().required(),
      autors: Yup.string().required(),
      avatar_id: Yup.string().required(),
    });
    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }
    const { name, editora, autors, avatar_id } = req.body;
    /**
     * Check if provider_d is a provider
     */

    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create bookss with providers ' });
    }
    const books = await Books.create({
      provider_id: req.userId,
      name,
      editora,
      autors,
      avatar_id,
    });
    return res.json(books);
  }
  async index(req, res) {
    const book = await Books.findAll({
      attributes: ['id', 'name', 'editora', 'autors', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(book);
  }
}

export default new BooksController();
