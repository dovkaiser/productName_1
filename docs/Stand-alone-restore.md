# Stand-alone restore

This section describes how to prepare and perform a full z/OS recovery from full-volume dumps created by BMC AMI Cloud. This procedure applies for stand-alone recovery when a DR system is unavailable. 

The following tasks describe the process of preparing and performing a full z/OS recovery with BMC AMI Cloud:

## Task 1: Install the stand-alone program

To prepare a stand-alone recovery restorable volume, you must first install the stand-alone program on the server. For more information about how to install the stand-alone program, see [Optional Installing the stand-alone Program for stand-alone restore](https://docs.bmc.com/xwiki/bin/view/Mainframe/Cloud/BMC-AMI-Cloud-Data-and-BMC-AMI-Cloud-Vault/cdacv51/Stand-alone-restore/).

## Task 2: Verify connectivity

For a DR scenario, the object storage must have TCP/IP-based communication with the DR LPAR or z/VM guest running the restore procedure.

## Task 3: Create a full-volume dump of your z/OS system

Perform the following steps:

1. Run a BMC AMI Cloud full-volume dump policy for all the volumes that you want to restore on the DR site. You can use the following compression types: 
   - DFDSS_COMPRESS
   - JAVA_LZ4
   - JAVA_GZIP
    > [!Note] Important
    > Full volume dumps created with BMC zData Mover don't support stand-alone > copy operations. For more information about BMC zData Mover, see [BMC zData Mover for full dump backups](https://docs.bmc.com/xwiki/bin/view/Mainframe/Cloud/BMC-AMI-Cloud-Data-and-BMC-AMI-Cloud-Vault/cdacv51/Using/Defining-policies/Creating-a-new-policy/Creating-a-full-dump-policy/BMC-zData-Mover-for-full-dump-backups/). 
    >
    > DFDSS_GZIP compression is not supported for stand-alone copies.

2. Use job BLDRSTVJ that is provided in the BMC AMI Cloud SAMPLIB to prepare CLI RESTVOL commands for full volume recovery. For more information about how to run BMC AMI Cloud CLI commands in batch, see [JCL](https://docs.bmc.com/xwiki/bin/view/Mainframe/Cloud/BMC-AMI-Cloud-Data-and-BMC-AMI-Cloud-Vault/cdacv51/Command-line-interface-CLI/CLI-Getting-started/JCL/).

## Task 4: Prepare a z/OS recovery system

A z/OS recovery system is a z/OS system running at the DR site with an agent installed. This system must be capable of reading from the object storage and writing to the target DASD volumes intended for the full-volume dump restores.

Perform the following steps:

1. Create a z/OS IPLable recovery LPAR at your main site. Use as few volumes as possible to reduce complexity, preferably one volume (also known as a one pack system).
2. Install the agent on your z/OS recovery system:
   1. Use the same release as your production environment.
   2. Configure the agent to access the object storage available to the DR site.
   3. Configure the agent to use the same resource complex as the production system by using the following parameter in the **agent.yml** config file: 
   ```objstore.resources.complex.id: group-<SYSPLEX>```
3. Prepare a stand-alone copy of your z/OS recovery system:
   1. Create a full-volume dump copy of the z/OS recovery system (one pack) by using a full dump policy.
   2. Prepare a stand-alone copy of the full volume dumps by using the **Prepare Stand-Alone Copy** action in the UI as described in [Preparing a full volume dump for stand-alone restore](https://docs.bmc.com/xwiki/bin/view/Mainframe/Cloud/BMC-AMI-Cloud-Data-and-BMC-AMI-Cloud-Vault/cdacv51/Stand-alone-restore/Preparing-a-full-volume-dump-for-stand-alone-restore/).
   3. Store the stand-alone volume copy on a media that is accessible by the DR site HMC. The media can be a USB device, DVD, or FTP site.
4. Copy the restore CLI RESTVOL commands to the z/OS recovery system.

> [!Note] Important
> Upgrade the agent on the z/OS recovery system whenever you upgrade the agent on you z/OS system.

In a disaster recovery scenario, perform a stand-alone restore as described in [Performing stand-alone restore bare-metal recovery](https://docs.bmc.com/xwiki/bin/view/Mainframe/Cloud/BMC-AMI-Cloud-Data-and-BMC-AMI-Cloud-Vault/cdacv51/Stand-alone-restore/Performing-stand-alone-restore-bare-metal-recovery/).