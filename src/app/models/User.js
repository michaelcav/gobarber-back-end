import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        // esses campos n precisam ser um reflexo dos campos q estão na nossa base de dados.
        // VIRTUAL é um campo q  nunca vai existir na nossa base de dados e sim somente aqui no codigo.
      },
      {
        sequelize,
      }
    );
    // addHook é um metodo dentro do sequelize que irá executar automaticamente quando uma ação é feita. Aqui nos estamos criptográfando a senha do usuario antes mesmo do usuario ser criado pelo beforeSave.
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
