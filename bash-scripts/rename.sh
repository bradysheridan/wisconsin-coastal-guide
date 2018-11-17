for f in $PWD/*
do
  fnFull=$(basename "$f")
  fnBase="${filename%.*}"
  mv $fnFull $fnBase.zip
done
