const OSQuery = require('../../sources/osquery')

module.exports = {
	
  async friendlyName (root, args, context) {
    const { hardware_model: hardwareModel } = await context.systemInfo
    return hardwareModel
  },
  	
  async disks (root, args, context) {
    const userPartitions = await OSQuery.all('mounts m join disk_encryption de ON m.device_alias = de.name', {
      where: "m.path = '/'",
      // where: 'bd.type != "Virtual Interface"', // this will exclude DMGs
      fields: ['label', 'de.name as name', 'de.uuid as uuid', 'encrypted']
    })
    return userPartitions
  },
}
