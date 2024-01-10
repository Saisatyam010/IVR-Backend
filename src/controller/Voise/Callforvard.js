const models = require('../models');
const twilio = require('twilio');

router.post('/callcongress/set-state', (req, res) => {
    // Get the digit pressed by the user
    const digitsProvided = req.body.Digits;

    if (digitsProvided === '1') {
        const state = req.body.CallerState;
        models.State.findOne({ where: { name: state } }).get('id').then(
            (stateId) => {
                return res.redirect('/callcongress/call-senators/' + stateId);
            }
        );
    } else {
        res.redirect('/callcongress/collect-zip')
    }
});


function callSenator(req, res) {
    models.State.findOne({
        where: {
            id: req.params.state_id
        }
    }).then(
        (state) => {
            return state.getSenators().then(
                (senators) => {
                    const response = new twilio.twiml.VoiceResponse();
                    response.say("Connecting you to " + senators[0].name + ". " +
                        "After the senator's office ends the call, you will " +
                        "be re-directed to " + senators[1].name + ".");
                    response.dial(senators[0].phone, {
                        action: '/callcongress/call-second-senator/' + senators[1].id
                    });
                    res.set('Content-Type', 'text/xml');
                    return res.send(response.toString());
                }
            );
        }
    );
}

router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);

function callSecondSenator(req, res) {
    models.Senator.findOne({
        where: {
            id: req.params.senator_id
        }
    }).then(
        (senator) => {
            const response = new twilio.twiml.VoiceResponse();
            response.say("Connecting you to " + senator.name + ". ");
            response.dial(senator.phone, {
                action: '/callcongress/goodbye/'
            });
            res.set('Content-Type', 'text/xml');
            return res.send(response.toString());
        }
    );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id', callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id', callSecondSenator)