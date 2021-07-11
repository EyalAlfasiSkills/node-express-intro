const gMsgs = []


function addMsg(msg) {
    gMsgs.push(msg)
}

function getSortedMsgs() {
    const sortedMsgs = gMsgs.sort((currMsg, nextMsg) => {
        if (currMsg.msg_date < nextMsg.msg_date) {
            return -1
        } else if (currMsg.msg_date === nextMsg.msg_date) {
            return 0
        } else {
            return 1
        }
    })

    return sortedMsgs
}

module.exports = {
    addMsg,
    getSortedMsgs
}