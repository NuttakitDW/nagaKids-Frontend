import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import styled from 'styled-components'

import nagaImg01 from './styles/img/Naga_21-22.png'
import pic1 from './styles/img/item1.png'
import pic2 from './styles/img/Character-02.png'
import pic3 from './styles/img/kid.png'
import eggGif from './styles/naga2.gif'
import nagaLogo from './styles/Draft_2-04.png'
import facebookIcon from './styles/facebook-round-color.svg'
import quixoticIcon from './styles/quixotic.svg'
import discordIcon from './styles/discord.svg'
import twitterIcon from './styles/twitter-round-color.svg'
import useInterval from 'use-interval'
import WalletAddress from './components/WalletAddress'
import Avatar from './components/Avatar'
// import { PresentToAll } from "@mui/icons-material";
import AOS from 'aos'
import 'aos/dist/aos.css'

export const StyledButton = styled.button``

export const StyledRoundButton = styled.button``

export const ResponsiveWrapper = styled.div``

export const StyledLogo = styled.img``

export const StyledImg = styled.img``

export const StyledLink = styled.a``

const isOpen = false

function App () {
  const dispatch = useDispatch()
  const blockchain = useSelector((state) => state.blockchain)
  const data = useSelector((state) => state.data)

  // const [approved, setApproved] = useState(data.approved)
  const [preSaleNum, setPreSaleNum] = useState(0)
  const [claimingNft, setClaimingNft] = useState(false)
  const [feedback, setFeedback] = useState('Click buy to mint your NFT.')
  // const [mintAmount, setMintAmount] = useState(1)

  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '',
    SCAN_LINK: '',
    NETWORK: {
      NAME: '',
      SYMBOL: '',
      ID: 0
    },
    NFT_NAME: '',
    SYMBOL: '',
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: '',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false
  })

  const contributorList = {
    // Founder: [
    //   {
    //     imgMain: 'https://thiti.dev/_nuxt/img/avatar.be5a716.jpeg',
    //     imgHover: '',
    //     link: ''
    //   }
    // ],
    Founder: [
      {
        imgMain: '/images/nuttakit-kundum-naga.png',
        imgHover: '/images/nuttakit-kundum-profile.jpeg',
        link: 'https://twitter.com/NuttakitNFT'
      }
    ],
    Content: [
      {
        imgMain: '/images/sukritta-vaskul-naga.png',
        imgHover: '/images/sukritta-vaskul-profile.jpeg',
        link: 'https://twitter.com/ezcrypto_ning'
      }
    ],
    Developer: [
      {
        imgMain: '/images/thiti-naga.png',
        imgHover: '/images/thiti-profile.jpeg',
        link: 'https://twitter.com/mrthiti_y'
      },
      {
        imgMain: '/images/nonthasak-l-naga.jpeg',
        imgHover: '/images/nonthasak-l-profile.png',
        link: 'https://twitter.com/mojisejr'
      }
    ],
    Treasury: [
      {
        imgMain: '/images/both-naga.png',
        imgHover: '/images/both-profile.png',
        link: 'https://twitter.com/0xbboth'
      },
      {
        imgMain: '/images/patompong-manprasatkul-naga.png',
        imgHover: '/images/patompong-manprasatkul-profile.jpeg',
        link: 'https://twitter.com/PattoMotto'
      }
    ],
    'Business Developer': [
      {
        imgMain: '/images/nutthapon-reewason-naga.png',
        imgHover: '/images/nutthapon-reewason-profile.jpeg',
        link: 'https://twitter.com/coalapanda3'
      }
    ],
    Academy: [
      {
        imgMain: '/images/nuttakit-kundum-naga.png',
        imgHover: '/images/nuttakit-kundum-profile.jpeg',
        link: 'https://twitter.com/NuttakitNFT'
      }
    ]
  }

  // useEffect(() => {
  //   setApproved(data.approved)
  // }, [data.approved])

  // const claimNFTs = () => {
  //   const cost = CONFIG.WEI_COST
  //   const gasLimit = CONFIG.GAS_LIMIT
  //   const totalCostWei = String(cost * mintAmount)
  //   const totalGasLimit = String(gasLimit * mintAmount)
  //   console.log('Cost: ', totalCostWei)
  //   console.log('Gas limit: ', totalGasLimit)
  //   setFeedback(`Minting your ${CONFIG.NFT_NAME}...`)
  //   setClaimingNft(true)
  //   blockchain.smartContract.methods
  //     .mint(mintAmount)
  //     .send({
  //       gasLimit: String(totalGasLimit),
  //       to: CONFIG.CONTRACT_ADDRESS,
  //       from: blockchain.account
  //     })
  //     .once('error', (err) => {
  //       console.log(err)
  //       setFeedback('Sorry, something went wrong please try again later.')
  //       setClaimingNft(false)
  //     })
  //     .then((receipt) => {
  //       console.log(receipt)
  //       setFeedback(
  //         `the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
  //       )
  //       setClaimingNft(false)
  //       dispatch(fetchData(blockchain.account))
  //     })
  // }

  const mintNFTs = () => {
    const cost = CONFIG.WEI_COST
    const gasLimit = CONFIG.GAS_LIMIT

    const totalCostWei = String(cost * blockchain.maxMintAmount)
    const totalGasLimit = String(gasLimit * blockchain.maxMintAmount)

    console.log('Cost: ', totalCostWei)
    console.log('Gas limit: ', totalGasLimit)

    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`)
    setClaimingNft(true)

    console.log(blockchain.proofs[0][3])

    blockchain.smartContract.methods
      .mint(blockchain.proofs[0][3], blockchain.proofs[0][1], blockchain.proofs[0][2])
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account
      })
      .once('error', (err) => {
        console.log(err)
        setFeedback('Sorry, something went wrong please try again later.')
        setClaimingNft(false)
      })
      .then((receipt) => {
        console.log(receipt)
        setFeedback(
          `the ${CONFIG.NFT_NAME} is yours! go visit Quixotic.io to view it.`
        )
        setClaimingNft(false)
        dispatch(fetchData(blockchain.account))
      })
  }

  // const approve = () => {
  //   const cost = CONFIG.WEI_COST
  //   const gasLimit = CONFIG.GAS_LIMIT
  //   const totalCostWei = String(cost * mintAmount)
  //   const totalGasLimit = String(gasLimit * mintAmount)
  //   console.log('Cost: ', totalCostWei)
  //   console.log('Gas limit: ', totalGasLimit)
  //   setFeedback(`Approving WETH for ${CONFIG.NFT_NAME}...`)
  //   setClaimingNft(true)
  //   console.log(blockchain)
  //   console.log('CONTRACT ADDRESS', CONFIG.CONTRACT_ADDRESS)
  //   blockchain.tokenContract.methods
  //     .approve(CONFIG.CONTRACT_ADDRESS, '1000000000000000000000000000000')
  //     .send({
  //       gasLimit: String(totalGasLimit),
  //       to: CONFIG.CONTRACT_ADDRESS,
  //       from: blockchain.account
  //     })
  //     .once('error', (err) => {
  //       console.log(err)
  //       setFeedback('Please refresh this page when the approval is confirmed')
  //       setClaimingNft(false)
  //     })
  //     .then((receipt) => {
  //       console.log(receipt)
  //       setFeedback(`WETH approved, let mint ${CONFIG.NFT_NAME}.`)
  //       setClaimingNft(false)
  //       dispatch(fetchData(blockchain.account))
  //       setApproved(true)
  //     })
  // }
  // const decrementMintAmount = () => {
  //   let newMintAmount = mintAmount - 1
  //   if (newMintAmount < 1) {
  //     newMintAmount = 1
  //   }
  //   setMintAmount(newMintAmount)
  // }
  // const incrementMintAmount = () => {
  //   let newMintAmount = mintAmount + 1
  //   if (newMintAmount > blockchain.maxMintAmount) {
  //     newMintAmount = blockchain.maxMintAmount
  //   }
  //   setMintAmount(newMintAmount)
  // }

  const initPreSaleNum = () => {
    setPreSaleNum(39)
  }

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account))
    }
  }

  const getConfig = async () => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const config = await configResponse.json()
    SET_CONFIG(config)
  }

  const currentConnectedAccount = async () => {
    try {
      const { ethereum } = window
      const accounts = await ethereum.request({
        method: 'eth_accounts'
      })

      if (accounts.length === 0) return

      dispatch(connect())
      getData()
      initPreSaleNum()
    } catch (err) { }
  }

  useEffect(() => {
    getConfig()
    currentConnectedAccount()
    AOS.init()
  }, [])

  useInterval(() => {
    getData()
  }, 3000)

  return (
    <div className='all-wrapper'>
      <div className='nagaLogo'>
        <img src={nagaLogo} alt='' />
      </div>
      <div className='nagaLinks'>
        <div className='icon'>
          <a
            href='https://quixotic.io/collection/0x9bF1FB77441df41aaA9a5a425d4E3a3527eeB4ec'
            target='_blank'
            className='a-link quixotic'
            rel='noreferrer'
          >
            <img src={quixoticIcon} alt='' />
          </a>
          <a
            href='https://discord.gg/DF7krb8uNq'
            target='_blank'
            className='a-link discord'
            rel='noreferrer'
          >
            <img src={discordIcon} alt='' />
          </a>
          <a
            href='https://www.facebook.com/nagadaonft/'
            target='_blank'
            className='a-link facebook'
            rel='noreferrer'
          >
            <img src={facebookIcon} alt='' />
          </a>
          <a
            href='https://twitter.com/The_NagaDAO'
            target='_blank'
            className='a-link twitter'
            rel='noreferrer'
          >
            <img src={twitterIcon} alt='' />
          </a>
        </div>
      </div>
      <section className='wave-section'>
        <div className='nagaEgg'>
          <img src={eggGif} alt='' />
        </div>

        <div className='mint-interface'>
          {
            Number(data.totalSupply) >= CONFIG.MAX_SUPPLY
              ? (
                <div>
                  <div>The sale has ended.</div>
                  You can still find {CONFIG.NFT_NAME} on
                  <StyledLink target='_blank' href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </StyledLink>
                </div>
                )
              : !isOpen
                  ? (
                    <div>Coming soon</div>
                    )
                  : (
                    <div>
                      {
                    blockchain.account === '' || blockchain.smartContract === null
                      ? (
                        <div className='connect-div'>
                          <button
                            className='buy-btn glow-on-hover'
                            onClick={(e) => {
                              e.preventDefault()
                              dispatch(connect())
                              getData()
                              initPreSaleNum()
                            }}
                          >
                            CONNECT
                          </button>

                          <div className='connect-div-p'>
                            Connect to the Optimism Network
                          </div>

                          {blockchain.errorMsg !== ''
                            ? (
                              <div>{blockchain.errorMsg}</div>
                              )
                            : null}
                        </div>
                        )
                      : blockchain.proofs.length > 0
                        ? (
                          <>
                            <div className='after-connected'>
                              <div className='mint-amount'>
                                {/* <button
                                  style={{ lineHeight: 0.4 }}
                                  disabled={claimingNft ? 1 : 0}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    decrementMintAmount()
                                  }}
                                >
                                  −
                                </button> */}
                                {blockchain.maxMintAmount}
                                {/*
                                <button
                                  disabled={claimingNft ? 1 : 0}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    incrementMintAmount()
                                  }}
                                >
                                  +
                                </button> */}
                              </div>

                              <div className='mint-btn'>
                                {/* {!approved && (
                                  <button
                                    className='buy-btn glow-on-hover'
                                    disabled={claimingNft ? 1 : 0}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      // approve()
                                      getData()
                                    }}
                                  >
                                    {claimingNft
                                      ? 'APPROVING...'
                                      : data.whitelist === -1
                                        ? 'Loading...'
                                        : 'APPROVE WETH'}
                                  </button>
                                )} */}

                                <button
                                  className='buy-btn glow-on-hover'
                                  disabled={claimingNft ? 1 : 0}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    mintNFTs() // Important
                                    getData()
                                  }}
                                >
                                  {claimingNft ? 'BUYING...' : 'BUY'}
                                </button>

                              </div>

                              {feedback}

                              <div className='connected-to'>
                                Connected to <WalletAddress />
                              </div>
                            </div>
                          </>
                          )
                        : (
                          <>
                            <div className='after-connected'>
                              <div className='mint-amount'>
                                {blockchain.proofs.length <= 0
                                  ? 'You are not in whitelist'
                                  : 'Your mint quota has exceeded'}
                              </div>
                              <div className='connected-to'>
                                Connected to <WalletAddress />
                              </div>
                            </div>
                          </>
                          )
                  }
                    </div>
                    )
          }
        </div>

        <a
          href='https://main.d1rz45xs0420mq.amplifyapp.com/'
          className='nagasec move'
        >
          <img className='nagasec nagaimg' src={nagaImg01} alt='' />
        </a>

        <div className='wave wave1' />
        <div className='wave wave2' />
        <div className='wave wave3' />
        <div className='wave wave4' />
        <div className='wave wave5' />
        <div className='wave wave6' />
      </section>

      <div className='bot-nav-container'>
        <div className='bot-nav'>
          {/* <div className="bot-nav-address">
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                  contract adddress: {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                </StyledLink>
            </div> */}
          <div className='bot-nav-minted'>
            {data.whitelist === -1
              ? (
                <>... / {CONFIG.MAX_SUPPLY}</>
                )
              : (
                <>
                  {Number(data.totalSupply) + preSaleNum} / {CONFIG.MAX_SUPPLY}
                </>
                )}
          </div>

          <div className='bot-nav-price'>
            1 {CONFIG.SYMBOL} ☰ {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
          </div>
        </div>
      </div>

      <section className='section'>
        <div className='section-inner'>
          <div className='inner-text'>
            <h2>What is Naga DAO?</h2>
            <p>
              Naga DAO is an organization develop your skill in web 3.0
            </p>
            Web 3.0 is a new industry made from blockchain that solve a working problem to lead everyone to a new oppotunities.
            <p />
          </div>
          <div
            className='inner-img'
            data-aos='fade-down-left'
            data-aos-duration='1000'
            data-aos-once='true'
            data-aos-anchor-placement='top-center'
          >
            <img src={pic2} alt='' className='img-resize-mobile' />
          </div>
        </div>
      </section>
      <section className='section' style={{ backgroundColor: '#c4dbcc' }}>
        <div className='section-inner'>
          <div
            className='inner-img'
            data-aos='fade-down-right'
            data-aos-duration='1000'
            data-aos-once='true'
            data-aos-anchor-placement='top-center'
          >
            <img src={pic1} alt='' />
          </div>
          <div className='inner-text alter'>
            <h2>Naga DAO's Vision</h2>
            <p>
              Naga has a vision to drive everyone onto web3.0 working and be a space that
            </p>
            <p>
              everyone can join to develop your working studying and learning to limit break and make a good working system.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="section">
        <div className="section-inner">
          <table>
            <tbody>
              <tr>
                <th>Type</th>
                <th>&nbsp;</th>
                <th>Variation</th>
                <th>&nbsp;</th>
              </tr>
              <tr>
                <td>1,000</td>
                <td>Total Naga</td>
                <td>60</td>
                <td>Body</td>
              </tr>
              <tr>
                <td>Common</td>
                <td>TBD</td>
                <td>50</td>
                <td>Cheek</td>
              </tr>
              <tr>
                <td>Uncommon</td>
                <td>TBD</td>
                <td>30</td>
                <td>Eyes</td>
              </tr>
              <tr>
                <td>Rare</td>
                <td>TBD</td>
                <td>20</td>
                <td>Mouths</td>
              </tr>
              <tr>
                <td>Ultra Rare</td>
                <td>TBD</td>
                <td>10</td>
                <td>Clothes</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>8</td>
                <td>Background</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}
      <section className='section'>
        <div className='section-inner'>
          <div className='inner-text'>
            <h2>Naga KIDS NFT</h2>
            <p>
              When Nagas step in to be part in daily life of humankind, the diffusion of human culture affects Nagas.
              The little Nagas wanted to understand better about humankind.
              The adorable illustrations were created and will make all of us endlessly fall in love with them.
            </p>
            <p>
              This project was created with the intention of everyone in Naga DAO aim to establish an encouraging working
              atmosphere within DAO where we all work together to boost this project out into the eyes of everyone.
              The artist of this collection is Nabtew, with a total of 1,111 supplies.
            </p>
          </div>
          <div
            className='inner-img'
            data-aos='fade-down-left'
            data-aos-duration='1000'
            data-aos-once='true'
            data-aos-anchor-placement='top-center'
          >
            <img src={pic3} alt='' />
          </div>
        </div>
      </section>

      <section className='section' style={{ backgroundColor: '#c4dbcc' }}>
        <div className='section-inner'>
          <div className='contribute'>
            <div className='title'>
              <h2>Contributor</h2>
            </div>
            {
              Object.keys(contributorList).map(key => (
                <div className='avatar' key={key}>
                  <div className='title'>
                    {key}
                  </div>
                  <div className='list'>
                    {
                      contributorList[key].map(it => (
                        <a href={it.link} target='_blank' key={it.imgMain} rel='noreferrer'>
                          <Avatar src={it.imgMain} srcHover={it.imgHover} />
                        </a>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      <section className='section' style={{ backgroundColor: '#00100f' }}>
        <div className='footer'>
          <div className='footer-div'>
            <p className='footer-div-p'>Join Us!</p>
          </div>

          <div className='icon'>
            <a href='https://quixotic.io/collection/0x9bF1FB77441df41aaA9a5a425d4E3a3527eeB4ec' className='a-link quixotic'>
              <img src={quixoticIcon} alt='' />
            </a>
            <a href='https://discord.gg/DF7krb8uNq' className='a-link discord'>
              <img src={discordIcon} alt='' />
            </a>
            <a
              href='https://www.facebook.com/nagadaonft/'
              className='a-link facebook'
            >
              <img src={facebookIcon} alt='' />
            </a>
            <a
              href='https://twitter.com/The_NagaDAO'
              className='a-link twitter'
            >
              <img src={twitterIcon} alt='' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
