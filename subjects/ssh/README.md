# Secure Shell (SSH)

Learn to use the SSH cryptographic network protocol to connect to other computers.

<!-- slide-include ../../BANNER.md -->

<!-- START doctoc -->
<!-- END doctoc -->



## What is SSH?

<!-- slide-front-matter class: center, middle -->

> SSH is a **cryptographic network protocol** for operating network services **securely over an unsecured network**.

> Its main uses are **remote command-line login** and **securing network services like Git or FTP**.

### Secure channel

SSH establishes a **secure channel** between two computers **over an insecure network** (e.g. a local network or the internet).

<img class='w100' src='images/ssh-secure-channel.png' />

It's a **client-server** protocol.
Using an SSH client, a user (or application) on machine A can connect to an SSH server running on machine B,
either to log in to machine B (with a command line shell) or to execute simple commands.

Establishing and using the secure channel requires a combination of **symmetric cryptography**, a **key exchange method**, **asymmetric cryptography** and **hashing**.

### Symmetric cryptography

In SSH, symmetric encryption is used to encrypt communications, using an algorithm such as [AES][aes] (others are also supported).

<p class='center'><img class='w80' src='images/symmetric-encryption.png' /></p>

Assuming **both client and server possess the same encryption key**,
they can encrypt and decrypt any data that goes through the insecure network.
An attacker **cannot decrypt the data without the key**.
All SSH data exchanged between client and server (and vice versa) is encrypted this way.

#### Example: symmetric encryption with AES

> **Windows users using Git Bash** may want to open a new shell with the command `winpty bash` before attempting to reproduce these examples.
> This is because of a [bug in Git Bash](https://github.com/mintty/mintty/issues/540) which causes problems with some interactive commands.

You may encrypt a **plaintext**, in this example the words "too many secrets",
with the [OpenSSL library][openssl] (installed on most computers).
Executing the following command pipeline will prompt you for an encryption key.
They key "changeme" was used in this example:

```bash
$> echo "too many secrets" | openssl aes-256-cbc | openssl enc -base64
enter aes-256-cbc encryption password:
Verifying - enter aes-256-cbc encryption password:
U2FsdGVkX1+Mfeh5m81iMlA7JwiLnq2V2bhJM0yVJqKDjbxLbLLfjJfxtgg2szg3
```

The resulting **ciphertext** cannot be decrypted without the key.
Executing the following command pipeline and entering the same key as before ("changeme") when prompted will decrypt it:

```bash
$> echo "U2FsdGVkX1+Mfeh5m81iMlA7JwiLnq2V2bhJM0yVJqKDjbxLbLLfjJfxtgg2szg3" \
   | openssl enc -d -base64 | openssl aes-256-cbc -d
enter aes-256-cbc decryption password:
too many secrets
```

### Key exchange

Symmetric encryption prevents an attacker from being able to read the exchanged data,
but you are still left with the problem of **how to exchange the symmetric encryption key**.

If it's the first time an SSH client is communicating with a particular SSH server,
they don't have a shared key yet. You **cannot send it over the network**, as that's **insecure**.

An impractical solution is to **physically transfer the key to both machines**,
which is in fact what used to be done, for example with the [Enigma machine][enigma] used in World War II.

The [Diffie-Hellman Key Exchange][dh], invented in 1976 by Whitfield Diffie and Martin Hellman,
was one of the first public key exchange protocols allowing users to **securely exchange secret keys**
even if an opponent is monitoring the communication channel.

#### Diffie-Hellman key exchange

<!-- slide-column -->

This conceptual diagram illustrates the general idea behind the protocol:

* The two parties, Alice and Bob, agree on an **arbitrary starting color** that is different every time,
  but does not need to be kept secret. Yellow, in this example.
* Each of them selects a **secret color known only to themselves**, in this case orange and blue-green.
* Alice and Bob then **mix their own secret color with the mutually shared color**,
  resulting in orange-tan and light-blue respectively, and **publicly exchange** the two mixed colors.
* Finally, Alice and Bob **mix the color he or she received** from the partner **with his or her own private color**.
  The result is a final color mixture (yellow-brown in this case) that is **identical to the partner's final color mixture**,
  and which was never shared publicly.

<!-- slide-column 30 -->

<img class='w100' src='images/dh.png' />

When using large numbers rather than colors, it would be computationally difficult for a third party to determine the secret numbers.

### Asymmetric cryptography

[Public-key or asymmetric cryptography][pubkey] is any cryptographic system that uses pairs of keys: **public keys** which may be disseminated widely, and **private keys** which are known only to the owner.
[RSA][rsa]
to asymmetrically sign the exchange parameters to prevent a [Man-in-the-Middle (MitM) attack][mitm]



## TODO

* Introduction
  * What is SSH? (remote login & network services, e.g. Git, SCP, SFTP)
* Public key cryptography reminder
* Authentication methods
  * Password
  * Public key
* Security (known hosts)
* Key management (local & remote)
* Other uses (tunneling)



## References

* [How does SSH Work](https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work)
* [Demystifying Symmetric and Asymmetric Methods of Encryption](https://www.cheapsslshop.com/blog/demystifying-symmetric-and-asymmetric-methods-of-encryption)
* [Diffie-Hellman Key Exchange][dh]



[aes]: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
[dh]: https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
[enigma]: https://en.wikipedia.org/wiki/Enigma_machine#Operation
[key-exchange]: https://en.wikipedia.org/wiki/Key_exchange
[mitm]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[openssl]: https://www.openssl.org
[pubkey]: https://en.wikipedia.org/wiki/Public-key_cryptography
[rsa]: https://en.wikipedia.org/wiki/RSA_(cryptosystem)
