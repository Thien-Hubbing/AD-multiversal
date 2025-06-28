import { DC } from "../constants.js";

/**
 * This functions resets all pre-multiversal resources including achievements and other stuff,
 * similar to NG.restartWithCarryover() but it doesn't affter the entire save file, just pre-multiverse
 * stuff.
 */
function resetPreMultiverse() {
  // Stage One: Prepartion
  player.multiverse.reached = false;

  // Stage Two: Celestials
  Quote.clearAll();
  Pelle.reset();
  Effarig.reset();
  for (const res of AlchemyResources.all) res.amount = new Decimal(0);
  Teresa.reset();
  Enslaved.reset();
  V.reset();
  Laitela.reset();
  disChargeAll();
  clearCelestialRuns();

  // Stage Three: Reality
  player.realities = new Decimal(0);
  player.reality.realityMachines = new Decimal(0);
  player.reality.iMCap = new Decimal(0);
  player.reality.imaginaryMachines = new Decimal(0);
  player.reality.maxRM = new Decimal(0);
  player.reality.upgReqs = 0;
  player.reality.imaginaryUpgReqs = 0;
  player.reality.upgradeBits = 0;
  player.reality.imaginaryUpgradeBits = 0;
  for (const upgrade in player.reality.imaginaryRebuyables) {
    if (!Object.hasOwn(player.reality.imaginaryRebuyables, upgrade)) continue;
    player.reality.imaginaryRebuyables[upgrade] = new Decimal(0);
  }
  for (const upgrade in player.reality.rebuyables) {
    if (!Object.hasOwn(player.reality.rebuyables, upgrade)) continue;
    player.reality.rebuyables[upgrade] = new Decimal(0);
  }
  player.reality.perks.clear();
  player.reality.perkPoints = new Decimal(0);
  player.reality.achTimer = new Decimal(0);
  Glyphs.unequipAll();
  player.reality.glyphs.inventory = [];
  Glyphs.validate();
  player.reality.automator.state.repeat = false;
  player.reality.automator.state.forceRestart = false;
  AutomatorBackend.stop();
  player.blackHole.forEach((element) => {
    element.durationUpgrades = new Decimal(0);
    element.intervalUpgrades = new Decimal(0);
    element.powerUpgrades = new Decimal(0);
    element.unlocked = false;
    element.active = false;
  });

  // Stage Four: Time Dilation
  player.dilation.studies = [];
  player.dilation.active = false;
  player.dilation.upgrades.clear();
  player.dilation.rebuyables = {
    1: new Decimal(),
    2: new Decimal(),
    3: new Decimal(),
    11: new Decimal(),
    12: new Decimal(),
    13: new Decimal(),
  };
  Currency.tachyonParticles.reset();
  player.dilation.nextThreshold = DC.E3;
  player.dilation.baseTachyonGalaxies = DC.D0;
  player.dilation.totalTachyonGalaxies = DC.D0;
  Currency.dilatedTime.reset();
  player.dilation.lastEP = DC.DM1;

  // Stage Two: Time Studies & Dimensions
  // For some reason the reset is handled within the currency reset function
  // for Time Theorems itself, which seems like a weird place to put it.
  Currency.timeTheorems.reset();
  ECTimeStudyState.invalidateCachedRequirements();
  fullResetTimeDimensions();
  Currency.timeShards.reset();
  player.totalTickGained = DC.D0;
  resetTimeDimensions();
  resetTickspeed();

  // Stage Three: Eternity Challenges
  player.eterc8ids = 50;
  player.eterc8repl = 40;
  player.eternityChalls = {};
  player.challenge.eternity.unlocked = 0;
  player.challenge.eternity.requirementBits = 0;
  player.challenge.eternity.current = 0;

  // Stage Four: Rest of Eternity
  Currency.eternityPoints.reset();
  EternityUpgrade.epMult.reset();
  Currency.eternities.reset();
  player.eternityUpgrades.clear();
  resetEternityRuns();

  // Stage Five: Post-Break Infinity
  player.break = false;
  Replicanti.reset(true);
  InfinityDimensions.fullReset();
  InfinityDimensions.resetAmount();
  Currency.infinityPower.reset();
  initializeChallengeCompletions();
  playerInfinityUpgradesOnReset();

  // Stage Six: Pre-Break Infinity
  resetInfinityRuns();
  Currency.infinityPoints.reset();
  Currency.infinities.reset();
  Currency.infinitiesBanked.reset();
  player.partInfinityPoint = 0;
  player.partInfinitied = 0;
  player.IPMultPurchases = DC.D0;

  // Stage Seven: Base game
  player.respec = false;
  player.dimensionBoosts = DC.D0;
  player.galaxies = DC.D0;
  player.sacrificed = DC.D0;
  AntimatterDimensions.reset();
  secondSoftReset(false);
  Currency.antimatter.reset();

  // Stage Eight: Records & Requirements
  Player.resetRequirements("multiverse");
  player.records.bestInfinity.time = DC.BEMAX;
  player.records.bestInfinity.realTime = DC.BEMAX;
  player.records.thisInfinity.time = DC.D0;
  player.records.thisInfinity.lastBuyTime = DC.D0;
  player.records.thisInfinity.realTime = DC.D0;
  player.records.thisEternity.time = DC.D0;
  player.records.thisEternity.realTime = DC.D0;
  player.records.bestEternity.time = DC.BEMAX;
  player.records.bestEternity.realTime = DC.BEMAX;
  player.records.thisInfinity.maxAM = DC.D0;
  player.records.thisEternity.maxAM = DC.D0;
  player.records.thisInfinity.bestIPmin = DC.D0;
  player.records.bestInfinity.bestIPminEternity = DC.D0;
  player.records.thisEternity.bestEPmin = DC.D0;
  player.records.thisEternity.bestInfinitiesPerMs = DC.D0;
  player.records.thisEternity.bestIPMsWithoutMaxAll = DC.D0;
  player.records.bestEternity.bestEPminReality = DC.D0;
  player.records.thisReality = {
    time: DC.D0,
    realTime: DC.D0,
    trueTime: 0,
    maxAM: DC.D0,
    maxIP: DC.D0,
    maxEP: DC.D0,
    bestEternitiesPerMs: DC.D0,
    maxReplicanti: DC.D0,
    maxDT: DC.D0,
    bestRSmin: DC.D0,
    bestRSminVal: DC.D0,
  };
  player.records.bestReality = {
    time: DC.BEMAX,
    realTime: DC.BEMAX,
    trueTime: 0,
    glyphStrength: DC.D0,
    RM: DC.D0,
    RMSet: [],
    RMmin: DC.D0,
    RMminSet: [],
    glyphLevel: DC.D0,
    glyphLevelSet: [],
    bestEP: DC.D0,
    bestEPSet: [],
    speedSet: [],
    iMCapSet: [],
    laitelaSet: [],
  };
  player.records.thisMultiverse = {
    time: DC.D0,
    realTime: DC.D0,
    trueTime: 0,
  };

  // Stage Nine: Miscellaneous stuff
  Autobuyers.reset();
  AchievementTimers.marathon2.reset();
  Tab.dimensions.antimatter.show();
  Lazy.invalidateAll();
  Achievements.all.forEach(element => element.lock());

  // Force-enable the group toggle for AD autobuyers to be active; whether or not they can actually tick
  // is still handled through if the autobuyers are unlocked at all. This fixes an odd edge case where the player
  // enters cel7 with AD autobuyers disabled - AD autobuyers need to be reupgraded, but the UI component
  // for the group toggle is hidden until they're all re-upgraded to the max again.
  player.auto.antimatterDims.isActive = true;
  player.buyUntil10 = true;
}

function incrementGainedMultiversalResources() {
  let gainedGodParticles = player.celestials.pelle.realityShards.plus(1).log10()
    .div(Math.log10(Number.MAX_VALUE));
  player.multiverse.godParticles = player.multiverse.godParticles.plus(gainedGodParticles.floor());

  let gainedRadiation = player.antimatter.plus(1).log10().div(9e15);
  player.multiverse.cherenkov = player.multiverse.cherenkov.plus(gainedRadiation);
}

export function multiverseReset(force = false, newGame = false) {
  if (newGame) {
    GameEnd.creditsClosed = false;
    GameEnd.creditsEverClosed = false;
    player.isGameEnd = false;
    // We set this ASAP so that the AD tab is immediately recreated without END formatting, and any lag which could
    // happen is instead hidden by the overlay from the credits rollback
    player.celestials.pelle.doomed = false;
    GlyphAppearanceHandler.unlockSet();
    NG.restartWithCarryover();

    // The ending animation ends at 12.5, although the value continues to increase after that. We set it to a bit above
    // 12.5 when we start the rollback animation to hide some of the unavoidable lag from all the reset functions
    GameEnd.removeAdditionalEnd = true;
    GameEnd.additionalEnd = 15;
    player.multiverse.times = player.multiverse.times.plus(1);
    incrementGainedMultiversalResources();
    EventHub.dispatch(GAME_EVENT.MULTIVERSE_RESET_AFTER);
  } else if (force) {
    player.multiverse.times = player.multiverse.times.plus(1);
    resetPreMultiverse();
    EventHub.dispatch(GAME_EVENT.MULTIVERSE_RESET_AFTER);
  } else {
    EventHub.dispatch(GAME_EVENT.MULTIVERSE_RESET_BEFORE);
    incrementGainedMultiversalResources();
    player.multiverse.times = player.multiverse.times.plus(1);
    resetPreMultiverse();
    EventHub.dispatch(GAME_EVENT.MULTIVERSE_RESET_AFTER);
  }
}
