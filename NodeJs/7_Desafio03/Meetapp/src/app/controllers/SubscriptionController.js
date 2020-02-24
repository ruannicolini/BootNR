
class SubscriptionController {
    async index(req, res) {
        return res.json('ok');    
    }

    async store(req, res) {
        return res.json('ok');
    }

    async delete(req, res) {
        return res.json('ok');
    }

}

export default new SubscriptionController();