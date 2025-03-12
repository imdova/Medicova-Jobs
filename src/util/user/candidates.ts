export function filterCandidates(
  candidates: CandidateType[],
  tab: TapType,
): CandidateType[] {
  switch (tab) {
    case "all":
      return candidates;
    case "locked":
      return candidates.filter((candidate) => !candidate.isUnlocked);
    case "unlocked":
      return candidates.filter((candidate) => candidate.isUnlocked);
    case "shortListed":
      return candidates.filter((candidate) => candidate.isShortlisted);
    default:
      return candidates;
  }
}
