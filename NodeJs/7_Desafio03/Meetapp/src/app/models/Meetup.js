import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
    static init(sequelize){
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
            },
            {sequelize}
        );
        return this;
    };

    static associate(models){
        //user
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user' });

        //file
        this.belongsTo(models.File, {foreignKey: 'file_id', as: 'file' });
        
    }

}

export default Meetup;